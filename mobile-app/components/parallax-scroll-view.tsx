import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';

const DEFAULT_HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  header?: ReactElement;
  headerHeight?: number;
  headerContainerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default function ParallaxScrollView({
  children,
  header,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  headerContainerStyle,
  contentStyle,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView ref={scrollRef} style={styles.container} scrollEventThrottle={16}>
      {header ? (
        <Animated.View
          style={[styles.header, { height: headerHeight }, headerContainerStyle, headerAnimatedStyle]}>
          {header}
        </Animated.View>
      ) : null}
      <ThemedView style={[styles.content, contentStyle]}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    height: 100
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
