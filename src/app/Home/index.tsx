import React, { useEffect } from 'react'
import { useState } from "react"
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native'
import { styles } from '@/app/Home/styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/shared-types/FilterStatus'
import { Item } from '@/components/Item'
import { ItemStorage, itemsStorage } from '@/storage/itemStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]


export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleItems(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await getItemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING)
    setDescription("")
  }

  async function getItemsByStatus(){
    try{
      const res = await itemsStorage.getByStatus(filter)
      setItems(res)
    } catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possivel filtrar os itens.")
    }
  }

  async function handledRemove(id: string){
    try{
      await itemsStorage.remove(id)
      await getItemsByStatus()
      console.log(`Removido item id ${id}`)

    }catch(error){
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  function handleClear(){
    Alert.alert("Limpar", "Deseja remover todos?", [
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear(){
    try{
      await itemsStorage.clear()
      setItems([])

    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Não foi possivel remover todos os itens.")
    }
  }

  useEffect(() => {
    getItemsByStatus()
  }, [filter])

  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/app/assets/logo.png")} style={styles.logo}></Image>

        <View style={styles.form}>
          <Input placeholder='O que voce precisa comprar?' onChangeText={setDescription} value={description} />
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

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}> Limpar</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                data={item}
                onStatus={() => console.log("mudar status")}
                onRemove={() => handledRemove(item.id)} />
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
