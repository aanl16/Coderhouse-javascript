// Preentrega 2 //

// Array de objetos con productos
const productos = [
    { nombre: "Leche", precio: 5 },
    { nombre: "Arroz", precio: 10 },
    { nombre: "Cebolla", precio: 2 },
    { nombre: "Tomate", precio: 3 },
    { nombre: "Chocolate", precio: 2 },
    { nombre: "Carne", precio: 15 },
    { nombre: "Pollo", precio: 15 }
];

// Carrito de compras
let carrito = [];

// Función para buscar productos
function buscarProducto(nombreProducto) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
}

// Función para mostrar el carrito
function mostrarCarrito() {
    if (carrito.length > 0) {
        console.log("Productos en tu carrito:");
        carrito.forEach(item => {
            console.log(item.nombre + " - $" + item.precio);
        });
        let costoTotal = carrito.reduce((total, item) => total + item.precio, 0);
        console.log("Total a pagar: $" + costoTotal);
    } else {
        console.log("Tu carrito está vacío.");
    }
}

// Función para agregar al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log(producto.nombre + " se ha agregado al carrito.");
}

// Función principal de compra
function realizarCompra() {
    let continuarCompra = true;

    while (continuarCompra) {
        let productoNombre = prompt('Bienvenido/a al mercado virtual. Disponemos de Leche, Arroz, Cebolla, Tomate, Carne, Pollo y Chocolate. Escriba el nombre del producto para agregarlo al carrito, o "EXIT" para finalizar.');

        while (productoNombre.toUpperCase() !== 'EXIT') {
            let productoEncontrado = buscarProducto(productoNombre);

            if (productoEncontrado) {
                agregarAlCarrito(productoEncontrado);
            } else {
                console.log("El producto no está disponible.");
            }

            productoNombre = prompt('Escriba otro producto para agregar al carrito o "EXIT" para finalizar.');
        }

        // Al finalizar, mostramos el carrito
        mostrarCarrito();

        if (carrito.length > 0) {
            let confirmarPago = prompt('¿Deseas proceder con el pago? (Si/No)');
            
            if (confirmarPago.toLowerCase() === 'si') {
                let total = carrito.reduce((total, item) => total + item.precio, 0);
                console.log("Pago exitoso. Has pagado $" + total);
                continuarCompra = false; // Finaliza el bucle y la compra
            } else {
                let seguirComprando = prompt('¿Deseas seguir comprando? (Si/No)');
                if (seguirComprando.toLowerCase() === 'no') {
                    continuarCompra = false; // Finaliza el bucle sin comprar
                    console.log("Compra cancelada. Gracias por visitarnos.");
                }
            }
        } else {
            console.log("Tu carrito está vacío. Gracias por visitarnos.");
            continuarCompra = false; // Finaliza el bucle si no hay productos
        }
    }
}

// Iniciamos la compra
realizarCompra();

