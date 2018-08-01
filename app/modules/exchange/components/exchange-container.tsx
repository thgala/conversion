import { Body, Container, Content, Header, Spinner, Title } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { ConversionRequest, ConversionResponse, ExchangeState, RateConfig } from '../model/exchange-model';
import { getCurrencyList } from '../model/exchange-selectors';
import { createConversionRateRequest } from '../redux/exchange-actions';
import styles from './exchange-css';
import { ExchangeInputComponent } from './exchange-input-component';

export interface ExchangeContainerProps  {
    calculateConversion: (request: ConversionRequest) => void;
    currentConversion: ConversionResponse;
    currencyList?: string[];
    loading: boolean;
}

export class ExchangeContainer extends React.PureComponent<ExchangeContainerProps, {}> {

    public render() {
        const {
            currencyList,
            calculateConversion,
            currentConversion,
            loading,
        } = this.props;
        const {from, to} = currentConversion;
        const loaded = !loading && currencyList && currentConversion;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Conversion Tool</Title>
                    </Body>
                </Header>

                <Content style={styles.content}>
                {!loaded &&
                    <Spinner color={'green'}/>
                }

                {loaded && from &&
                    <ExchangeInputComponent
                        config={{
                                currency: from.currency,
                                amount: from.amount
                        }}
                        onChange={
                            (config: RateConfig) => calculateConversion(
                            {
                                from: config,
                                toCurrency: to!.currency,
                            }
                        )}
                        currencyList={currencyList}
                    />
                }
                {loaded &&
                    <ExchangeInputComponent
                        config={{
                                currency: to!.currency,
                                amount: to!.amount
                        }}
                        onChange={(config: RateConfig) => calculateConversion(
                            {
                                to: config,
                                toCurrency: from!.currency,
                            }
                        )}
                        currencyList={currencyList}
                    />
                }
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state: { exchange: ExchangeState }) {
    const { conversionRatesData, currentConversion, loading } = state.exchange;
    return {
        currencyList: getCurrencyList(conversionRatesData!),
        currentConversion,
        loading,
    };
  }

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        calculateConversion: (request: ConversionRequest) => dispatch(createConversionRateRequest(request)),
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ExchangeContainer);
