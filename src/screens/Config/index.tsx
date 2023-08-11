import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Divider } from "react-native-paper";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import InfoImg from "../../assets/info.svg";
import LogoutImg from "../../assets/logout.svg";
import PinImg from "../../assets/pin.svg";
import ChevronImg from "../../assets/chevron-white.svg";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

export default function Config() {
  const navigation = useNavigation<StackRouterProps>();

  // botões de opções
  // como só há o botão de dados e sair coloquei junto, porém se for adicionar mais
  // deverá ser refatorado para o style ficar adequado.
  const options = [
    {
      id: 1,
      title: "Meus dados",
      subtitle: "Nome e contato",
      icon: <InfoImg width={24} height={24} />,
      onPress: () => navigation.push("UserInfo"),
    },
    {
      id: 2,
      title: "Endereço",
      subtitle: "Meu endereço atual",
      icon: <PinImg width={24} height={24} />,
      onPress: () => navigation.push("AdressInfo"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* 
        // caso não for usar a imagem, usar o texto mesmo
          <AvatarText
          label="L"
          size={80}
          backgroundColor={APPTHEME.colors.background}
        /> 
      */}
      <View style={styles.header}>
        <Avatar.Icon
          icon="image-plus"
          style={styles.avatar}
          color={APPTHEME.colors.primary}
          size={80}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>Johnny Doe</Text>
          <Text style={styles.subtitle}>johnny.doe@example.com</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View>
          <Divider
            style={{
              backgroundColor: APPTHEME.colors.background,
              opacity: 0.5,
            }}
          />
          {
            // não to usando Flatlist porque não é uma lista(plmns por agr)
            options.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => item.onPress()}
                >
                  <View style={styles.buttonContent}>
                    {item.icon}
                    <View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.buttonText}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <ChevronImg width={24} height={24} />
                </TouchableOpacity>
                <Divider
                  style={{
                    backgroundColor: APPTHEME.colors.background,
                    opacity: 0.5,
                  }}
                />
              </View>
            ))
          }
        </View>
        <View>
          <Divider
            style={{
              backgroundColor: APPTHEME.colors.background,
              opacity: 0.5,
            }}
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <View style={styles.exitButtonContent}>
              <LogoutImg width={24} height={24} />
              <View>
                <Text style={styles.title}>Sair</Text>
              </View>
            </View>
            <ChevronImg width={24} height={24} />
          </TouchableOpacity>
          <Divider
            style={{
              backgroundColor: APPTHEME.colors.background,
              opacity: 0.5,
            }}
          />
        </View>
      </View>
    </View>
  );
}
