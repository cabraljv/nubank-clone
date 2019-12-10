import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Card, Content, CardHeader, CardContent, CardFooter, Title, Description, Annotation } from './styles';
import Header from '~/components/Header'

import { Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';
export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        }
      }
    ],
    { useNativeDriver: true },
  )

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let oppened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        oppened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      Animated.timing(translateY, {
        toValue: oppened ? 380 : 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        offset = oppened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });

    }
  }
  return (
    <Container >
      <Header />
      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Card style={{
            transform: [{
              translateY: translateY.interpolate({
                inputRange: [-350, 0, 380],
                outputRange: [-50, 0, 380],
                extrapolate: 'clamp'
              })
            }]
          }}>
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 197.711,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência de R$20,00 recebida de João Victor
            </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
}
