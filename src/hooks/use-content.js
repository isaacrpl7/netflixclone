import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useContent(target) {
    const [content, setContent] = useState();
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        firebase
            .firestore()
            .collection(target)//retorna a coleção da db em um target que pode ser séries ou filmes
            .get()
            .then(snapshot => {
                const allContent = snapshot.docs.map(contentObj => (//para cada docs dentro do snapshot, ele vai retornar os dados e o id
                    {
                        ...contentObj.data(),
                        docId: contentObj.id,
                    }
                ))

                setContent(allContent);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    return { [target]: content }
}