const express = require('express');
const session = require('express-session');
const sessionStore = require('./sessionconfig'); // Importe o arquivo de configuração da sessão
const bodyParser = require('body-parser');
const path = require('path'); // Importe o módulo 'path'

const app = express();
const port = 8080;

// Importando modelos
const Pet = require('./models/pet'); // Certifique-se de que o caminho está correto


// Configurar express-session com o armazenamento personalizado
app.use(
    session({
      secret: '12345678',
      resave: false,
      saveUninitialized: true,
      store: sessionStore, // Use o armazenamento personalizado
    })
  );

// Configurar o mecanismo de visualização EJS
app.set('view engine', 'ejs');

// Configurar o diretório de visualização
app.set('views', path.join(__dirname, 'views'));


// static redirecionado para a pasta public
app.use(express.static(__dirname + '/public'));



// Configurar o body-parser para analisar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para verificar o carregamento de rotas
app.use((req, res, next) => {
    console.log('Rota acessada:', req.url);
    next();
});


// importa rota login
const rotasLogin = require('./rotas/login'); // Importar o arquivo de rotas
app.use('/', rotasLogin); // Usar as rotas

// Middleware para verificar se o usuário está autenticado
app.use((req, res, next) => {
    if (
        req.url !== '/' && // Permita o acesso à página de login sem autenticação
        req.url !== '/cadastrausuario' && // Permita o acesso à página de cadastro de pets sem autenticação
        req.url !== '/adotar' && // Permita o acesso à página de cadastro de pets sem autenticação
        !req.session.user_id
    ) {
        res.redirect('/login');
    } else {
        next();
    }
});


// Importe a rota do dashboard
const dashboardRoute = require('./rotas/dashboard');
app.use('/', dashboardRoute);

// Rota para servir a imagem do animal
app.get('/pets/:id_pet/photo', (req, res) => {
    const petId = req.params.id_pet;
    Pet.findByPk(petId).then((pet) => {
        if (!pet || !pet.foto_pet) {
            // Se o animal ou a imagem não existir, envie uma imagem padrão ou outra resposta apropriada
            return res.status(404).send('Imagem não encontrada');
        }
        // Configurar o cabeçalho da resposta para indicar que é uma imagem
        res.setHeader('Content-Type', 'image/jpeg'); // Certifique-se de definir o tipo de conteúdo correto

        // Enviar a imagem do animal
        res.send(pet.foto_pet);
    }).catch((error) => {
        console.error('Erro ao buscar a imagem do animal:', error);
        res.status(500).send('Erro ao buscar a imagem do animal');
    });
});

// Rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            res.status(500).send('Erro ao encerrar a sessão.');
        } else {
            res.redirect('/'); // Redirecione para a página de login após o logout
        }
    });
});
  

// Configurar rotas
const rotas = require('./rotas/testecadbd'); // Importar o arquivo de rotas
app.use('/', rotas); // Usar as rotas

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'html', 'home.html'); // Substitua pelo caminho correto para sua página
    res.sendFile(filePath);
});

// importa rota cadastra usuario
const rotasCadastraUsuario = require('./rotas/cadastrausuario'); // Importar o arquivo de rotas
app.use('/', rotasCadastraUsuario); // Usar as rotas

// importa rota cadastro pet
const rotasCadastroPet = require('./rotas/cadastropet'); // Importar o arquivo de rotas
app.use('/', rotasCadastroPet); // Usar as rotas

// Importar e usar as rotas da página de adoção
const animalRoutes = require('./rotas/adotar'); // Certifique-se de que o caminho esteja correto
app.use('/', animalRoutes); // Rotas da página de adoção

// importa rota petperdido
const rotasPetPerdido = require('./rotas/petperdido'); // Importar o arquivo de rotas
app.use('/', rotasPetPerdido); // Usar as rotas

// Importe a rota de pets perdidos
const perdidosRoute = require('./rotas/perdidos');
app.use('/', perdidosRoute);

// importa rota petencontrado
const rotasPetencontrado = require('./rotas/petencontrado'); // Importar o arquivo de rotas
app.use('/', rotasPetencontrado); // Usar as rotas

// importa rota qrcode
const qrcodeRouter = require('./rotas/qrcode');
app.use('/qrcode', qrcodeRouter);

// importa rota encontrados (busca de pets encontrados)
const encontradosRoute = require('./rotas/encontrados');
app.use('/', encontradosRoute);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});
