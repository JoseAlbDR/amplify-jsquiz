import { useTheme, Image, View } from "@aws-amplify/ui-react";

// Authentification component (logo image)
export const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image alt="Amplify logo" src="./assets/pngwing.com.png" />
      </View>
    );
  },
};

// SignUp Register Theme
export const Theme = function () {
  const { tokens } = useTheme();
  const theme = {
    name: "Dark",
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral["90"].value,
          },
          secondary: {
            value: tokens.colors.neutral["100"].value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          primary: {
            10: tokens.colors.teal["100"],
            80: tokens.colors.teal["40"],
            90: tokens.colors.teal["20"],
            100: tokens.colors.teal["10"],
          },
        },
        text: {
          fontSize: { value: "2rem" },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.white.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.yellow["80"].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.white.value,
              },
            },
          },
        },
      },
    },
  };
  return theme;
};
