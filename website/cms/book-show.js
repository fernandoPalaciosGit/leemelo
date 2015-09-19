/*keys for only landing page*/
var bookshow = {
        cms: {
            labellist: {
                isbn: 'ISBN',
                title: 'Título',
                description: 'Descriptión'
            }
        }
    },
/*Keys for share between layers, but different values*/
    common = {
        widgetStyle: '/css/bookshow.css',
        widgetScript: {
            'global-config': '/scripts/factories/global-config.js',
            'socketIo': '/scripts/prototypes/socketIo.js',
            'book-show': '/scripts/widgets/book-show.js'
        },
        navigation: {
            title: 'Nuevo libro a disfrutar'
        },
        head: {
            description: 'Un nuevo libro acaba de ser añadido dentro de la libreria.',
            seotitle: 'Leemelo: nuevo libro añadido'
        },
        footer: {
            maintitle: 'Leemelo',
            linkhelp: 'Ayuda',
            linkprivacy: 'Terminos y Privacidad'
        }
    };

module.exports.bookshow = bookshow;
module.exports.common = common;
