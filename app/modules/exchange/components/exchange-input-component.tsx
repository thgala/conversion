import { Button, Content, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { RateConfig } from '../model/exchange-model';
import styles from './exchange-css';
import { ExchangeCurrencySelector } from './exchange-currency-selector';

export interface ExchangeInputComponentProps {
    onChange: (config: RateConfig) => void;
    currencyList?: string[];
    config: RateConfig;
}

export class ExchangeInputComponent extends React.PureComponent<ExchangeInputComponentProps, { uiOpened: boolean }> {
    constructor(props: ExchangeInputComponentProps) {
        super(props);
        this.state = {
            uiOpened: false,
        };
    }

    public toggleSelectionUI() {
        this.setState({
            uiOpened: !this.state.uiOpened,
        });
    }

    public onSelectCurrency(isoCode: string) {
        const { config, onChange } = this.props;
        this.toggleSelectionUI();
        onChange({...config, currency: isoCode});
    }

    public render() {
        const { config, currencyList, onChange } = this.props;
        const isNumber = (text: string) => !isNaN(parseFloat(text));
        const validateAmount = (text: string) => isNumber(text) ? onChange({...config, amount: parseFloat(text)}) : {};
        return (
            <Form>
                <Item>
                    <Button
                        onPress={() => this.toggleSelectionUI()}
                        style={{...styles.padded, ...styles.green}}>
                        <Label style={styles.label}>
                            {config.currency}
                        </Label>
                    </Button>

                    <Input
                        keyboardType={'numeric'}
                        clearTextOnFocus={true}
                        onChangeText={(text: string) => validateAmount(text)}
                        value={`${config.amount}`}
                    />
                </Item>

            { currencyList && this.state.uiOpened &&
                <ExchangeCurrencySelector
                    onPress={(isoCode: string) => this.onSelectCurrency(isoCode)}
                    list={currencyList}
                />
            }
            </Form>
        );
    }
}
