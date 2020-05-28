/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Currency, displayMoney } from "mysterium-vpn-js"
import { faIdCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import mosaicBg from "../../../ui-kit/assets/mosaic-bg.png"
import { useStores } from "../../../store"
import { fontMono, textHuge } from "../../../ui-kit/typography"
import { LightButton } from "../../../ui-kit/mbutton/light-button"

const Container = styled.div`
    width: 100%;

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        opacity: 0.94;
        background-image: url(${mosaicBg});
        background-position: 0 -5px;
    }
    display: flex;
    flex-direction: column;
`

const Top = styled.div`
    color: #fff;
    padding: 0 24px;
`

const Identity = styled.div`
    box-sizing: border-box;
    height: 52px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const IdentityAddress = styled.div`
    ${fontMono}
`

const Balance = styled.div`
    margin: 24px 0;
`

const Amount = styled.div`
    ${textHuge}
    font-weight: bold;
`

const TestnetDisclaimer = styled.div`
    padding: 12px 24px;
    background: #2e1150;
    border-radius: 4px;
`

const WalletActions = styled.div`
    margin: 24px 0;
`

const IdentityIcon = styled.div`
    padding-right: 16px;
`

export const WalletView: React.FC = observer(() => {
    const { identity, payment } = useStores()
    const balanceDisplay = displayMoney(
        {
            amount: identity.identity?.balance ?? 0,
            currency: Currency.MYSTTestToken,
        },
        {
            showCurrency: true,
            removeInsignificantZeros: false,
        },
    )
    const topUpAction = (): Promise<void> => payment.topUp()
    return (
        <Container>
            <Top>
                <Identity>
                    <IdentityIcon>
                        <FontAwesomeIcon
                            className="icon"
                            icon={faIdCard}
                            color="white"
                            size="lg"
                            title={identity.identity?.registrationStatus ?? ""}
                        />
                    </IdentityIcon>
                    <IdentityAddress title={identity.identity?.registrationStatus ?? ""}>
                        {identity.identity?.id}
                    </IdentityAddress>
                </Identity>
                <Balance>
                    <p>Available balance</p>
                    <Amount>{balanceDisplay}</Amount>
                </Balance>
                <TestnetDisclaimer>
                    MYSTT is a test token which you get for free while we are in the Testnet environment
                </TestnetDisclaimer>
                <WalletActions>
                    <LightButton onClick={topUpAction}>Top Up</LightButton>
                </WalletActions>
            </Top>
        </Container>
    )
})
