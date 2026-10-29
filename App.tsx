import { useRef, useState, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Image,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
const images = [
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64e05999-2a40-46af-b073-bc466b15232e/dlgy6ad-e31a176c-c3c0-49d4-b9e2-d807b7fa17ee.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi82NGUwNTk5OS0yYTQwLTQ2YWYtYjA3My1iYzQ2NmIxNTIzMmUvZGxneTZhZC1lMzFhMTc2Yy1jM2MwLTQ5ZDQtYjllMi1kODA3YjdmYTE3ZWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kjxm6xvVyL9F2YFSMZzNZAGJnz2rR9xJwr159-qw4nw',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/38623bb6-38f5-455d-96ab-8a5be5956ba9/dgiq4cg-c0623e7c-973a-4021-a20e-601e34504656.png/v1/fill/w_690,h_1158/invincible_by_rendercentral_dgiq4cg-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjE0OCIsInBhdGgiOiJcL2ZcLzM4NjIzYmI2LTM4ZjUtNDU1ZC05NmFiLThhNWJlNTk1NmJhOVwvZGdpcTRjZy1jMDYyM2U3Yy05NzNhLTQwMjEtYTIwZS02MDFlMzQ1MDQ2NTYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Ub0A1IUO2I0ATQ-6X7ylTANPt8E-79ykn2nEclaXRRI',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3acc143-332f-43c9-8707-d61106b45a55/dejvpmj-db75f4bd-1714-43fd-b08c-20b7fa5d31dc.png/v1/fill/w_1096,h_729/invincible___image_comics___render_v3_by_rayluishdx2_dejvpmj-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDI2MCIsInBhdGgiOiJcL2ZcL2IzYWNjMTQzLTMzMmYtNDNjOS04NzA3LWQ2MTEwNmI0NWE1NVwvZGVqdnBtai1kYjc1ZjRiZC0xNzE0LTQzZmQtYjA4Yy0yMGI3ZmE1ZDMxZGMucG5nIiwid2lkdGgiOiI8PTY0MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7rkJ8OGT9HQ1nRUc7BSgLuq35bbs8SzfAaeik7LDdCs', 'https://tse4.mm.bing.net/th/id/OIP.UNiUxcwF9-3E7Us3rkGA8wHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
];
const randomIndex = Math.floor(Math.random() * images.length);
const IMAGE_URL = images[randomIndex];
const DraggableView = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const [imageUrl, setImageUrl] = useState(
    images[Math.floor(Math.random() * images.length)]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setImageUrl(images[randomIndex]);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      }
    ),

    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        tension: 500,
        friction: 0.1,
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.imageContainer]}
        >
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: 400,
    height: 400,
  },

  image: {
    width: '100%',
    height: '100%',
  },
});

export default DraggableView;