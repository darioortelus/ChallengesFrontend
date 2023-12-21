function reverse(miArray) {
    const formato = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    // Extraer caracteres especiales y sus posiciones
    let charEsp = [];
    let posCharEsp = [];

    miArray.map((element, indice) => {
        if (formato.test(element)) {
            charEsp.push(element);
            posCharEsp.push(indice);
        }
    });

    // Invertir el resto del array
    let resArray = miArray.filter(element => !formato.test(element)).reverse();
    
    // Reintroducir los caracteres especiales en sus posiciones originales
    posCharEsp.map((element, indice) => {
        resArray.splice(element, 0, charEsp[indice]);
    });

    document.getElementById('arrayInput').innerHTML = '[' + miArray.map(elemento => `'${elemento}'`).join(', ') + ']';
    document.getElementById('arrayOutput').innerHTML = '[' + resArray.map(elemento => `'${elemento}'`).join(', ') + ']';
}

var miArray = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8, ];
reverse(miArray);