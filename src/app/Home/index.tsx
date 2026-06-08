import React from 'react'
import { useState } from "react"
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native'
import { styles } from '@/app/Home/styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/shared-types/FilterStatus'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]


export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<any>([])

  function handleItems(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    setItems([newItem])

  }


  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/app/assets/logo.png")} style={styles.logo}></Image>

        <View style={styles.form}>
          <Input placeholder='O que voce precisa comprar?' onChangeText={setDescription} />
          <Button title="Adicionar" onPress={handleItems}/>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status) =>
                <Filter
                  key={status}
                  status={status}
                  isActive={filter === status}
                  onPress={() => setFilter(status)}
                  />
              )
            }

            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearText}> Limpar</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Item
                data={item}
                onStatus={() => console.log("mudar status")}
                onRemove={() => console.log("remover item")} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separatorList} />}
            contentContainerStyle={styles.listConatiner}
            ListEmptyComponent={() => <Text style={styles.empty}>Nenhum Item aqui</Text>}
          />
        </View>
      </View>
    </>

  )
}
