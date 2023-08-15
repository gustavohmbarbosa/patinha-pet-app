import React from "react";
import { View, Text, Dimensions } from "react-native";

import LogoImg from "../../assets/logo.svg";
import ArrowLeftImg from "../../assets/arrow-left.svg";
import { styles } from "./styles";
import { ButtonIcon } from "../ButtonIcon";

type CadastralHeaderProps = {
  maxHeightHeader: number;
  title: string;
  subtitle: string;
  goBack?: boolean;
};

export function CadastralHeader({
  maxHeightHeader,
  title,
  subtitle,
  goBack = false,
}: CadastralHeaderProps) {
  return (
    <View style={styles.header}>
      {goBack && (
        <ButtonIcon
          style={styles.button}
          icon={<ArrowLeftImg width={32} height={32} />}
        />
      )}
      <LogoImg
        style={styles.logo}
        width={"150%"}
        height={maxHeightHeader}
        rotation={-15}
      />
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}
