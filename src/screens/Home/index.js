import React, {useState, useEffect} from "react";
 
import { 
    View, 
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
 
export default function Home() {

    //Criando os states 
    let [saudacao, setSaudacao] = useState('');
    let [idTarefaEdit, setIdTarefaEdit] = useState('');
    let [tarefaEdit, setTarefaEdit] = useState('');
    let [modalNovo, setModalNovo] = useState('');
    let [tarefa, setTarefa] = useState('');
    
    let [minhasTarefas, setMinhasTarefas] = useState([
        {
            id: 0,
            nome: 'Limpar o Quintal'
        },

        {
            id: 1,
            nome: 'Arrumar a Cama'
        },

        {
            id: 2,
            nome: 'Escovar os Dentes'
        },

        {
            id: 3,
            nome: 'Tomar Banho'
        },
    ]);
    
    useEffect(()=>{
        const currentHour = new Date().getHours();
        
        if (currentHour < 12) {
            setSaudacao("Bom Dia ☀");
        } else if (currentHour >= 12 && currentHour < 18) {
            setSaudacao("Boa Tarde ❂");
        } else {
            setSaudacao("Boa Noite ☾");
        }
    },[]);
    
    //Função para Adicionar uma nova tarefa
    function adicionaTarefa(){
        if(tarefa.trim() != '') {
            const dados = {
                id: String(new Date().getTime()),
                nome: tarefa,
            };
            
            setMinhasTarefas((oldState) => [... oldState, dados]);
            setTarefa('');
        }
        else {
            alert('Digite uma nova Tarefa')
        }
    
    }
    
    //Função para Deletar uma tarefa
    function deletarTarefa(index) {
        console.log('id tarefa:' + index); 
        
        let novasTarefas = [...minhasTarefas];
        
        novasTarefas = novasTarefas.filter((item, i)=> {
            if(item.id != index) {
                return true;
            }
            else {
                return false;
            } 
        });
        setMinhasTarefas(novasTarefas);
    }

    //Função para Editar uma tarefa
    function buscarTarefa(id) {
        let novasTarefas = [...minhasTarefas];

        novasTarefas = novasTarefas.filter((item)=> {
            if(item.id != id) {
                return true;
            }
            else {
                setIdTarefaEdit(id);
                setTarefaEdit(item.nome)
                return true;
            }
        });
        setMinhasTarefas(novasTarefas);
        setModalNovo(true);
    }

    function editarTarefa() {
        if(tarefaEdit.trim() != '') {

            let novasTarefas = [...minhasTarefas];
            novasTarefas = novasTarefas.filter((item)=> {
                if(item.id == idTarefaEdit) {
                    item.nome = tarefaEdit;
                    return true;
                }
                else {
                    return true;
                }
            })
            setMinhasTarefas(novasTarefas);
        }
        else {
            alert('Digite um nome de uma tarefa')
        }

    }
 
    return(
        <View style={styles.container}>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalNovo}>
                <View style={styles.telaEdit}>
                    <TouchableOpacity style={styles.botaoFechar} onPress={()=> setModalNovo(false)}>
                        <Ionicons name="close-outline" size={32} color="black"/>
                    </TouchableOpacity>
                    <Text style={styles.tituloModal}>Editar Tarefa</Text>
                    <TextInput 
                        value={tarefaEdit}
                        returnKeyType="done"
                        style={styles.campo}
                        onChangeText={setTarefaEdit}
                        placeholder="Digite a nova tarefa"
                    />
                    <TouchableOpacity style={styles.botao} onPress={() => editarTarefa()}>
                        <Text style={styles.textoBotao}>Alterar Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Text style={styles.titulo}>{saudacao}</Text>
            <Text style={styles.titulo}>App de Tarefas</Text>

            <TextInput 
                value={tarefa}
                
                returnKeyType="send" 
                style={styles.campo} 
                onChangeText={setTarefa} 
                placeholder="Digite uma nova tarefa"
            />
            
            <TouchableOpacity style={styles.botao} onPress={adicionaTarefa}>
                <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
            
            <Text style={styles.titulo}>Lista de Tarefas</Text>
            <Text style={styles.subTitulo}>Aqui estão todas as suas tarefas ↓</Text>
            
            <FlatList
                data={minhasTarefas}
                keyExtractor={(item) => item.id}
                renderItem={(({item}) => 
                <View style={styles.botaoTarefa}>
                    <View style={styles.icones}>
                        <Text style={styles.textoBotaoTarefa}>{item.nome}</Text>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <TouchableOpacity onPress={()=>deletarTarefa(item.id)}>
                                    <Ionicons name="trash-outline" size={32} color="#ECD2DF"/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>buscarTarefa(item.id)}>
                                    <Ionicons name="pencil-outline" size={32} color="#ECD2DF"/>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>
                )}
            />
        </View>
    );
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        paddingVertical: 80,
        paddingHorizontal: 30,
    },
 
    titulo:{
        display: 'flex',
        color: '#CA687C',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        justifyContent: 'center'
    },
 
    subTitulo:{
        display: 'flex',
        justifyContent: 'center',
        color: '#ECD2DF',
        fontSize: 15,
        marginBottom: 20,
    },
 
    campo:{
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        marginTop: 20,
        borderRadius: 5,
        padding: 10,
    },
 
    botao:{
        backgroundColor: '#901238',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
 
    textoBotao:{
        color: '#ECD2DF',
        fontSize: 17,
        fontWeight: 'bold',
    },
 
    botaoTarefa:{
        backgroundColor: '#1F1E25',
        padding:15,
        marginBottom: 10
    },
 
    textoBotaoTarefa:{
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        width: 180,
    },
 
    icones:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    telaEdit:{
        height: 230,
        width: 230,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 200,
        borderRadius: 10,
    },
 
    tituloModal:{
        display: 'flex',
        color: '#901238',
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
    },

    botaoFechar:{
        marginLeft: 180,
    },
});