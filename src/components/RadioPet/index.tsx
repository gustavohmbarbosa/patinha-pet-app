import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

// quais tipos de animais
// exporta pq irá ser mais fácil quando precisar declarar o state
export type RadioTypePetProps = "dog" | "cat";

type RadioPetProps = {
  pet: RadioTypePetProps;
  setPet: (pet: RadioTypePetProps) => void;
};

export function RadioPet({ pet, setPet }: RadioPetProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={pet == "dog" ? styles.itemSelected : styles.item}
        onPress={() => {
          setPet("dog");
        }}
      >
        {/* IMG dog.svg em svg para alterar a cor corretametnte de acordo com a seleção */}
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M18 4C16.29 4 15.25 4.33 14.65 4.61C13.88 4.23 13 4 12 4C11 4 10.12 4.23 9.35 4.61C8.75 4.33 7.71 4 6 4C3 4 1 12 1 14C1 14.83 2.32 15.59 4.14 15.9C4.78 18.14 7.8 19.85 11.5 20V15.72C10.91 15.35 10 14.68 10 14C10 13 12 13 12 13C12 13 14 13 14 14C14 14.68 13.09 15.35 12.5 15.72V20C16.2 19.85 19.22 18.14 19.86 15.9C21.68 15.59 23 14.83 23 14C23 12 21 4 18 4ZM4.15 13.87C3.65 13.75 3.26 13.61 3 13.5C3.25 10.73 5.2 6.4 6.05 6C6.59 6 7 6.06 7.37 6.11C5.27 8.42 4.44 12.04 4.15 13.87ZM9 12C8.73478 12 8.48043 11.8946 8.29289 11.7071C8.10536 11.5196 8 11.2652 8 11C8 10.46 8.45 10 9 10C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4804 10 10.7348 10 11C10 11.56 9.55 12 9 12ZM15 12C14.7348 12 14.4804 11.8946 14.2929 11.7071C14.1054 11.5196 14 11.2652 14 11C14 10.46 14.45 10 15 10C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.56 15.55 12 15 12ZM19.85 13.87C19.56 12.04 18.73 8.42 16.63 6.11C17 6.06 17.41 6 17.95 6C18.8 6.4 20.75 10.73 21 13.5C20.75 13.61 20.36 13.75 19.85 13.87Z"
            fill={
              pet == "dog"
                ? APPTHEME.colors.neutrals.white
                : APPTHEME.colors.primary
            }
          />
        </Svg>
        <Text style={pet == "dog" ? styles.labelSelected : styles.label}>
          Cão
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={pet != "dog" ? styles.itemSelected : styles.item}
        onPress={() => {
          setPet("cat");
        }}
      >
        {/* IMG dog.svg em svg para alterar a cor corretametnte de acordo com a seleção */}
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M12 8L10.67 8.09C9.81001 7.07 7.40001 4.5 5.00001 4.5C5.00001 4.5 3.03001 7.46 4.96001 11.41C4.41001 12.24 4.07001 12.67 4.00001 13.66L2.07001 13.95L2.28001 14.93L4.04001 14.67L4.18001 15.38L2.61001 16.32L3.08001 17.21L4.53001 16.32C5.68001 18.76 8.59001 20 12 20C15.41 20 18.32 18.76 19.47 16.32L20.92 17.21L21.39 16.32L19.82 15.38L19.96 14.67L21.72 14.93L21.93 13.95L20 13.66C19.93 12.67 19.59 12.24 19.04 11.41C20.97 7.46 19 4.5 19 4.5C16.6 4.5 14.19 7.07 13.33 8.09L12 8ZM9.00001 11C9.26522 11 9.51958 11.1054 9.70711 11.2929C9.89465 11.4804 10 11.7348 10 12C10 12.2652 9.89465 12.5196 9.70711 12.7071C9.51958 12.8946 9.26522 13 9.00001 13C8.73479 13 8.48044 12.8946 8.2929 12.7071C8.10536 12.5196 8.00001 12.2652 8.00001 12C8.00001 11.7348 8.10536 11.4804 8.2929 11.2929C8.48044 11.1054 8.73479 11 9.00001 11ZM15 11C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8947 11.4804 16 11.7348 16 12C16 12.2652 15.8947 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13C14.7348 13 14.4804 12.8946 14.2929 12.7071C14.1054 12.5196 14 12.2652 14 12C14 11.7348 14.1054 11.4804 14.2929 11.2929C14.4804 11.1054 14.7348 11 15 11ZM11 14H13L12.3 15.39C12.5 16.03 13.06 16.5 13.75 16.5C14.1478 16.5 14.5294 16.342 14.8107 16.0607C15.092 15.7794 15.25 15.3978 15.25 15H15.75C15.75 15.5304 15.5393 16.0391 15.1642 16.4142C14.7891 16.7893 14.2804 17 13.75 17C13 17 12.35 16.59 12 16C11.65 16.59 11 17 10.25 17C9.71957 17 9.21087 16.7893 8.83579 16.4142C8.46072 16.0391 8.25001 15.5304 8.25001 15H8.75001C8.75001 15.3978 8.90804 15.7794 9.18935 16.0607C9.47065 16.342 9.85218 16.5 10.25 16.5C10.94 16.5 11.5 16.03 11.7 15.39L11 14Z"
            fill={
              pet != "dog"
                ? APPTHEME.colors.neutrals.white
                : APPTHEME.colors.primary
            }
          />
        </Svg>

        <Text style={pet != "dog" ? styles.labelSelected : styles.label}>
          Gato
        </Text>
      </TouchableOpacity>
    </View>
  );
}
