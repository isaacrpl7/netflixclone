import React, { useState, useContext, useEffect } from 'react';
import { SelectProfileContainer } from './profiles';
import { FirebaseContext } from '../context/firebase'
import { Header, Loading } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function BrowseContainer({ slides }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({}); //Cria o estado do perfil a ser escolhido
    const [loading, setLoading] = useState(true); //Cria o estado da tela de carregar
    const { firebase } = useContext(FirebaseContext); // Retorna o contexto do Firebase
    const user = firebase.auth().currentUser || {}; // Retorna as informações do atual usuário usando o contexto que foi retornado

    useEffect(() => { //cria um hook para componentDidMount
        setTimeout(() => { //assim que o componente monta, ele irá esperar 3000 segundos e depois deixar o loading como false
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);//Assegura que somente irá rodar o hook novamente, caso o displayName em profile mude

    return profile.displayName ? ( //Se escolheram um perfil, carregue a página principal, se não, carregue a de escolher perfil
        <>
            {loading ? (//Se o estado de loading for true, carregue a página carregando, se não, carregue ReleaseBody
                <Loading src={user.photoURL} />
            ) : ( 
                <Loading.ReleaseBody /> 
            )}

            <Header src="joker1" dontShowOnSmallViewPort>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
                        <Header.TextLink>Series</Header.TextLink>
                        <Header.TextLink>Films</Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                        <Header.Search
                            searchTerm={searchTerm} 
                            setSearchTerm={setSearchTerm} 
                        />
                        <Header.Profile>
                            <Header.Picture src={user.photoURL} />
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL} />
                                    <Header.TextLink>{user.displayName}</Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                </Header.Frame>
                <Header.Feature>
                    <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                    <Header.Text>
                        Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he
                        walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job
                        as a clown, and the guise he projects in a futile attempt to feel like he&apos;s part of the world around him.
                    </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.Feature>
            </Header>
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile} />
    );
}