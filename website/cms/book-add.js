    /*keys for only landing page*/
var bookadd = {
        cms: {
            mainpagetitle: 'Añade un nuevo libro',
            formadd: {
                isbn: 'Identificador',
                title: 'Titulo',
                descrtiption: '¿Como es tu libro?',
                submit: 'Crear'
            }
        }
    },
    /*Keys for share between layers, but different values*/
    common = {
        widgetStyle: '/css/bookadd.css',
        navigation: {
            title: 'Uno más en la Biblio'
        },
        head: {
            description: 'Añade la descripcion y caracteristicas de un nuevo libro a tu biblioteca.',
            seotitle: 'Leemelo: Añadir libro'
        },
        footer: {
            maintitle: 'Leemelo',
            linkhelp: 'Ayuda',
            linkprivacy: 'Terminos y Privacidad'
        }
    };

module.exports.bookadd = bookadd;
module.exports.common = common;
