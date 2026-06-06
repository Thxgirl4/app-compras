import { View, Image } from 'react-native'
import { styles } from '@/app/Home/styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/shared-types/FilterStatus'

export function Home() {
  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/app/assets/logo.png")} style={styles.logo}></Image>

        <View style={styles.form}>
          <Input placeholder='O que voce precisa comprar?' />
          <Button title="Entrar" />
        </View>

        <View style={styles.content}>
          <Filter status={FilterStatus.DONE} isActive/>
          <Filter status={FilterStatus.PENDING} isActive={false}/>
        </View>
      </View>
    </>

  )
}
