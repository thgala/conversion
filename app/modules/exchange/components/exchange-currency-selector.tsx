import { Item, Text } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native';
import styles from './exchange-css';

export interface ExchangeCurrencySelectorProps {
    list: string[];
    onPress?: (isoCode: string) => void;
}

export class ExchangeCurrencySelector extends React.PureComponent<ExchangeCurrencySelectorProps, {}> {
    public render() {
        const { list, onPress } = this.props;
        return (
            <Item>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                    justifyContent: 'space-between',
                    padding: 10,
                }}>
                    {list.map(
                        (currencyName: string) =>
                            <Text
                                style={styles.padded}
                                onPress={() => onPress ? onPress(currencyName) : {}}
                                key={currencyName}>
                                {currencyName}
                            </Text>
                    )}
                </ScrollView>
            </Item>
        );
    }
}
