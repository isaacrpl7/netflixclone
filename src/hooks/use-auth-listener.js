import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));// Pega o authUser dentro do localStorage e coloca como sendo um state do react
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => { //iremos usar um useEffect hook para componentDidMount
        const listener = firebase.auth().onAuthStateChanged(authUser => {//maneira recomendada de retornar o usuário atual
            if(authUser) {//se existe um authUser, ele deve guardar esse user no localStorage e atualizar o state do componente
                localStorage.setItem('authUser', JSON.stringify(authUser));//como o localStorage guarda em string, devemos converter para string
                setUser(authUser);//atualiza o state
            } else {//se não houver um authUser remova do localStorage e mude o estado para nulo
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();//irá limpar o listener no componentWillUnmount
    }, []);

    return {user};
}