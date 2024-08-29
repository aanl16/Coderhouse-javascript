// Preentrega 1 //

let leche = 5
let arroz = 10
let cebolla = 2
let tomate = 3
let chocolate = 2
let carne = 15
let pollo = 15

let costoTotal = 0
let listaProducto = ""

let producto = prompt('Bienvenido/a al mercado virtual, disponemos de Leche, Arroz, Cebolla, Tomate, Carne, Pollo y Chocolate. Escriba alguno de estos productos para agregarlos al carrito, cuando termine escriba "EXIT".')

function sumaTotal() {
    console.log("Has pagado = " + costoTotal)
    console.log("Has comprado: " + listaProducto)
}

function compra(producto) {
    switch (producto) {
        case 'Leche':
            costoTotal += leche;
            listaProducto += "Leche, ";
            break;
        case 'Arroz':
            costoTotal += arroz;
            listaProducto += "Arroz, ";
            break;
        case 'Cebolla':
            costoTotal += cebolla;
            listaProducto += "Cebolla, ";
            break;
        case 'Tomate':
            costoTotal += tomate;
            listaProducto += "Tomate, ";
            break;
        case 'Chocolate':
            costoTotal += chocolate;
            listaProducto += "Chocolate, ";
            break;
        case 'Carne':
            costoTotal += carne;
            listaProducto += "Carne, ";
            break;
        case 'Pollo':
            costoTotal += pollo;
            listaProducto += "Pollo, ";
            break;
        default:
            console.log("Producto no disponible");
            break;
    }
}
while (producto !== 'EXIT') {
    compra(producto)
    producto = prompt('Bienvenido/a al mercado virtual, disponemos de Leche, Arroz, Cebolla, Tomate, Carne, Pollo y Chocolate. Escriba alguno de estos productos para agregarlos al carrito, cuando termine escriba "EXIT".')
}

if (costoTotal !== 0) {
    let pago = prompt('El total es ' + costoTotal + '. ¿Estás seguro de pagar? (Si/No)')
    
    if (pago === 'Si') {
        sumaTotal()
    } else {
        console.log('Compra cancelada. Gracias por visitarnos.')
    }
} else {
    console.log('No has agregado productos al carrito. Gracias por visitarnos.')
}