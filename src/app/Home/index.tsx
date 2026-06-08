import React from 'react'
import { useState } from "react"
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native'
import { styles } from '@/app/Home/styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/shared-types/FilterStatus'
import { Item } from '@/components/Item'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: "1 pacote de café" },
  { id: '2', status: FilterStatus.PENDING, description: "3 pacotes de macarrão" },
  { id: '3', status: FilterStatus.PENDING, description: "3 tomates" },
]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/app/assets/logo.png")} style={styles.logo}></Image>

        <View style={styles.form}>
          <Input placeholder='O que voce precisa comprar?' />
          <Button title="Adicionar" />
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
            data={ITEMS}
            keyExtractor={(item) => item.id}
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
