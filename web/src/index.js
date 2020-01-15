//importação do React
//é necessário importar o React em todo arquivo JS que irá usar JSX
//JSX = JavaScript + XML (sintaxe do HTML)
import React from 'react';

//O ReactDom dá a habilidade do React se comunicar com a árvore de elementos (HTML) da aplicação 
import ReactDOM from 'react-dom';
import App from './App';

//pega o reactDom e manda renderizar o App (conteúdo da página) dentro da div 'root
ReactDOM.render(<App />, document.getElementById('root'));
