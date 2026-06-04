import { View, Image} from 'react-native'
import {styles} from '@/app/Home/styles'
import { Button } from '@/components/Button'

export function Home() {
  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/app/assets/logo.png")} style={styles.logo}></Image>
        
        <Button title="Entrar"/>
      </View>
    </>

  )
}
