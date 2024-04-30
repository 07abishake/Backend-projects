const http = require('http');
const fs = require('fs');
const url = require('url');

const html = fs.readFileSync('./Templete/index.html', 'utf-8');
const productListHtml = fs.readFileSync('./Templete/product-list.html', 'utf8');
const productDetailHtml = fs.readFileSync('./Templete/product-details.html', 'utf8');
const productsData = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8')); // Read products data

const productHtmlArray = productsData.map((prod) => {
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage)
                               .replace('{{%NAME%}}', prod.product?.name )
                               .replace('{{%MODELNAME%}}', prod.modelName )
                               .replace('{{%MODELNO%}}', prod.modelNumber )
                               .replace('{{%SIZE%}}', prod.size )
                               .replace('{{%CAMERA%}}', prod.camera)
                               .replace('{{%PRICE%}}', prod.price )
                               .replace('{{%COLOR%}}', prod.color )
                               .replace('{{%ID%}}', prod.id );
    return output;
});

function replaceHtml(template, product) {
    let output = template.replace('{{%IMAGE%}}', product.productImage)
                        .replace('{{%NAME%}}', product.product?.name )
                        .replace('{{%MODELNAME%}}', product.modelName )
                        .replace('{{%MODELNO%}}', product.modelNumber )
                        .replace('{{%SIZE%}}', product.size )
                        .replace('{{%CAMERA%}}', product.camera)
                        .replace('{{%PRICE%}}', product.price )
                        .replace('{{%COLOR%}}', product.color )
                        .replace('{{%ID%}}', product.id );
    return output;
}

const server = http.createServer((request, response) => {
    let { query, pathname: path } = url.parse(request.url, true);

    if (path === '/' || path.toLowerCase() === '/home') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', 'you are in home page'));
    } else if (path.toLowerCase() === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', 'you are in about page'));
    } else if (path.toLowerCase() === '/contact') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', 'you are in contact page'));
    } else if (path.toLowerCase() === '/product') {
        if (!query.id) {
            let productHtmlArray = productsData.map((prod) => {
                return replaceHtml(productListHtml, prod);
            });

            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(productResponseHtml);
        } else {
            let product = productsData.find(product => product.id == query.id);
            if (product) {
                let productDetailResponseHtml = replaceHtml(productDetailHtml, product);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
            } else {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('Product not found.');
            }
        }
    } else {
        const errorHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error 404 - Page Not Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 {
                        font-size: 36px;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 18px;
                    }
                </style>
            </head>
            <body>
                <h1>Error 404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </body>
            </html>
        `;
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(errorHtml);
    }
});

server.listen(8500, '127.0.0.1', () => {
    console.log('Server has started');
});
