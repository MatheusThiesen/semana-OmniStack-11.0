import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import * as MailCompose from 'expo-mail-composer';


import logoImg from '../../assets/logo.png'
import styles from './style'

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const incident = route.params.incident;
  const teste = route.params.teste;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajuda no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', 
    {
      style: 'currency',
      currency:'BRL'
    }).format(incident.value)}`
  
  function navigateBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`)
  }
  function sendEmail() {
    MailCompose.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
        <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      
      <FlatList 
        data={[1]}
        style={styles.incidentsList}
        keyExtractor={incidents => String(incidents)}
        showsVerticalScrollIndicator={false}
        renderItem={()=>(    
          <>  
            <View style={styles.incidents}>
        <Text style={[styles.incidentsProperty, {marginTop:0}]}>ONG: {teste}</Text>
        <Text style={styles.incidentsValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
              
              <Text style={styles.incidentsProperty}>CASO:</Text>
              <Text style={styles.incidentsValue}>{incident.title}</Text>
              
              <Text style={styles.incidentsProperty}>VALOR:</Text>
              <Text style={styles.incidentsValue}>{
                Intl.NumberFormat('pt-BR', 
                  {
                    style: 'currency',
                    currency:'BRL'
                  }).format(incident.value)}
              </Text>
            </View>

            <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Salve o dia!</Text>
              <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
              
              <Text style={styles.heroDescription}>Entre em contato</Text>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.action}
                  onPress={sendWhatsapp}
                >
                  <Text style={styles.actionText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.action}
                  onPress={sendEmail}
                >
                  <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>          
              </View>
            </View>
          </>
        )}
      />
    </View>
  )
}