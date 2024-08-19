import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";
import { useAuth } from "../../hooks/useAuth";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import ChevronImg from "../../assets/chevron-white.svg";
import InfoImg from "../../assets/info.svg";
import LogoutImg from "../../assets/logout.svg";
import PinImg from "../../assets/pin.svg";
import TrackerImg from "../../assets/tracker.svg";
import { AvatarIcon } from "../../components/AvatarIcon";

export default function Config() {
  const navigation = useNavigation<StackRouterProps>();

  const { user, logOut } = useAuth();

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
    // {
    //   id: 3,
    //   title: "Rastreadores",
    //   subtitle: "Meus rastreadores vinculados",
    //   icon: <TrackerImg width={24} height={24} />,
    //   onPress: () => navigation.push("Trackers"),
    // },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <AvatarIcon
          icon="image-plus"
          color={APPTHEME.colors.primary}
          backgroundColor={APPTHEME.colors.background}
          size={80}
        /> */}
        {/* <View style={styles.headerText}>
          <Text style={styles.title}>
            {user.user.firstName + " " + user.user.lastName}
          </Text>
          <Text style={styles.subtitle}>{user.user.email}</Text>
        </View> */}
      </View>
      <View style={styles.content}>
        <View>
          {/* <Divider
            style={{
              backgroundColor: APPTHEME.colors.background,
              opacity: 0.5,
            }}
          /> */}
          {
            // não to usando Flatlist porque não é uma lista(plmns por agr)
            // options.map((item) => (
            //   <View key={item.id}>
            //     <TouchableOpacity
            //       style={styles.button}
            //       onPress={() => item.onPress()}
            //     >
            //       <View style={styles.buttonContent}>
            //         {item.icon}
            //         <View>
            //           <Text style={styles.title}>{item.title}</Text>
            //           <Text style={styles.buttonText}>{item.subtitle}</Text>
            //         </View>
            //       </View>
            //       <ChevronImg width={24} height={24} />
            //     </TouchableOpacity>
            //     <Divider
            //       style={{
            //         backgroundColor: APPTHEME.colors.background,
            //         opacity: 0.5,
            //       }}
            //     />
            //   </View>
            // ))
          }
        </View>
        <View>
          <Divider
            style={{
              backgroundColor: APPTHEME.colors.background,
              opacity: 0.5,
            }}
          />
          <TouchableOpacity style={styles.button} onPress={logOut}>
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
