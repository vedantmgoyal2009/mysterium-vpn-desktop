/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import { action, configure, observable } from "mobx"

import { DaemonStore } from "./daemon/store"
import { ConnectionStore } from "./connection/store"
import { IdentityStore } from "./identity/store"
import { ProposalStore } from "./proposals/store"
import { PaymentStore } from "./payment/store"

// import { enableLogging } from "mobx-logger"

export class RootStore {
    daemon: DaemonStore
    connection: ConnectionStore
    identity: IdentityStore
    proposals: ProposalStore
    payment: PaymentStore

    @observable
    wallet = false

    constructor() {
        this.daemon = new DaemonStore()
        this.connection = new ConnectionStore(this)
        this.identity = new IdentityStore(this)
        this.proposals = new ProposalStore(this)
        this.payment = new PaymentStore(this)

        // Setup cross-store reactions after all injections.
        this.connection.setupReactions()
        this.identity.setupReactions()
        this.proposals.setupReactions()
    }

    @action
    openWallet = (): void => {
        this.wallet = true
    }

    @action
    closeWallet = (): void => {
        this.wallet = false
    }
}

export const rootStore = new RootStore()
export const storesContext = React.createContext(rootStore)

// enableLogging()

configure({ enforceActions: "always" })

export const useStores = (): RootStore => React.useContext(storesContext)
