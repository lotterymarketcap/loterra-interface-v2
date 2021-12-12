import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import { LCDClient, WasmAPI } from '@terra-money/terra.js'
import {
    useWallet,
    WalletStatus,
    useConnectedWallet,
    ConnectType,
} from '@terra-money/wallet-provider'
import {
    Wallet,
    CaretRight,
    UserCircle,
    Trophy,
    Power,
    List,
    Check,
    X,
    Ticket,
    Coin,
    Bank,
} from 'phosphor-react'
import numeral from 'numeral'
import UserModal from './UserModal'
import { useStore } from '../store'
import { Link } from '@reach/router'
// let useWallet = {}
// if (typeof document !== 'undefined') {
//     useWallet = require('@terra-money/wallet-provider').useWallet
// }
/*const Modal = {
    position: "absolute",
    width: "100%",
    height:"100%",
    left: "0",
    top: "0",
}
const Dialog = {
    position: "absolute",
    right: "100px",
    top: "120px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",

} */

const DialogButton = {
    margin: '10px 20px 10px 20px',
}
export default function ConnectWallet() {
    let connectedWallet = ''
    const [isDisplayDialog, setIsDisplayDialog] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [sideNav, setSideNav] = useState(false)
    const [bank, setBank] = useState()
    const [alteBank, setAlteBank] = useState()
    const [connected, setConnected] = useState(false)
    const { state, dispatch } = useStore()

    //Nav link active settings
    let homeClass, stakingClass, daoClass
    if (typeof location !== 'undefined') {
        homeClass = location.pathname === '/' ? 'active' : ''
        stakingClass = location.pathname.match(/^\/staking/) ? 'active' : ''
        daoClass = location.pathname.match(/^\/dao/) ? 'active' : ''
    }

    let wallet = ''
    if (typeof document !== 'undefined') {
        wallet = useWallet()
        connectedWallet = useConnectedWallet()
    }

    const lcd = useMemo(() => {
        if (!connectedWallet) {
            return null
        }

        return new LCDClient({
            URL: connectedWallet.network.lcd,
            chainID: connectedWallet.network.chainID,
        })
    }, [connectedWallet])
    //Get proposals and save to state
    // const terra = new LCDClient({
    //     URL: 'https://lcd.terra.dev/',
    //     chainID: 'columbus-4',
    // })
    const api = new WasmAPI(state.lcd_client.apiRequester)
    async function baseData() {
        const latestBlocks = await axios.get(
            'https://lcd.terra.dev/blocks/latest',
        )

        dispatch({
            type: 'setBlockHeight',
            message: latestBlocks.data.block.header.height,
        })

        const contractConfigInfo = await api.contractQuery(
            state.loterraContractAddress,
            {
                config: {},
            },
        )

        dispatch({ type: 'setConfig', message: contractConfigInfo })
        dispatch({
            type: 'setCurrentLotteryId',
            message: contractConfigInfo.lottery_counter,
        })
        dispatch({
            type: 'setHolderPercentageFee',
            message: contractConfigInfo.token_holder_percentage_fee_reward,
        })

        const { winners } = await api.contractQuery(
            state.loterraContractAddress,
            {
                winner: {
                    lottery_id: contractConfigInfo.lottery_counter - 1,
                },
            },
        )
        dispatch({ type: 'setAllRecentWinners', message: winners })

        const contractDaoBalance = await api.contractQuery(
            state.loterraContractAddressCw20,
            {
                balance: {
                    address: state.loterraContractAddress,
                },
            },
        )
        dispatch({ type: 'setDaoFunds', message: contractDaoBalance.balance })

        const contractDogetherState = await api.contractQuery(
            state.dogetherAddress,
            {
                state: {}
            },
        )
        dispatch({
            type: 'setDogetherState',
            message: contractDogetherState,
        })

        const contractLPLoterraBalance = await api.contractQuery(
            state.loterraContractAddressCw20,
            {
                balance: {
                    address: state.loterraStakingLPAddress,
                },
            },
        )
        dispatch({
            type: 'setStakingLoterraFunds',
            message: contractLPLoterraBalance.balance,
        })
        const contractLPAlteredBalance = await api.contractQuery(
            state.loterraContractAddressCw20,
            {
                balance: {
                    address: state.alteredStakingLPAddress,
                },
            },
        )
        dispatch({
            type: 'setStakingAlteredFunds',
            message: contractLPAlteredBalance.balance,
        })

        // Get total pool in Dogether
        const total_pool_dogether = await api.contractQuery(
            'terra19h4xk8xxxew0ne6fuw0mvuf7ltmjmxjxssj5ts',
            {
                state: {},
            },
        )
        dispatch({
            type: 'setTotalBalancePoolDogether',
            message: total_pool_dogether.total_ust_pool,
        })

        const jackpotAltered = await api.contractQuery(
            state.alteredContractAddress,
            {
                balance: {
                    address: state.loterraContractAddress,
                },
            },
        )
        dispatch({
            type: 'setAlteredJackpot',
            message: jackpotAltered.balance,
        })

        //console.log('config',contractConfigInfo)

        if (window.location.href.indexOf('dao') > -1) {
            let pollCount = contractConfigInfo.poll_count
            //console.log('count',pollCount)
            let allProposals = []
            for (let index = 1; index < pollCount + 1; index++) {
                const proposal = await api.contractQuery(
                    state.loterraContractAddress,
                    {
                        get_poll: { poll_id: index },
                    },
                )
                proposal.nr = index
                allProposals.push(proposal)
                //console.log('single', proposal)
            }
            dispatch({ type: 'setAllProposals', message: allProposals })
            //console.log('proposals',allProposals)
        }

        const staking = await api.contractQuery(state.loterraStakingAddress, {
            state: {},
        })
        dispatch({ type: 'setStaking', message: staking })
        //console.log('staking',staking)

        const token_info = await api.contractQuery(
            state.loterraContractAddressCw20,
            {
                token_info: {},
            },
        )
        dispatch({ type: 'setTokenInfo', message: token_info })

        const state_lp_staking = await api.contractQuery(
            state.loterraStakingLPAddress,
            {
                state: {},
            },
        )
        dispatch({ type: 'setStateLPStaking', message: state_lp_staking })
        const pool_info = await api.contractQuery(state.loterraPoolAddress, {
            pool: {},
        })
        console.log('pool_info')
        console.log(pool_info)
        dispatch({ type: 'setPoolInfo', message: pool_info })
    }

    //const installChrome = useInstallChromeExtension();
    //const connectedWallet = ConnectedWallet ? useConnectedWallet() : undefined;

    function display() {
        // active or disable dialog
        setIsDisplayDialog(!isDisplayDialog)
    }
    function closeModal() {
        setIsDisplayDialog(false)
    }
    function connectTo(to) {
        if (to == 'extension') {
            wallet.connect(wallet.availableConnectTypes[1])
        } else if (to == 'mobile') {
            wallet.connect(wallet.availableConnectTypes[2])
        } else if (to == 'disconnect') {
            wallet.disconnect()
            dispatch({ type: 'setWallet', message: {} })
        }
        setConnected(!connected)
        setIsDisplayDialog(false)
    }

    async function checkIfWon() {
        // Code for winner detector
        try {
            let type = false
            console.log('checking for winner')
            // Query all winners for most recent draw

            //Test purposes
            //   recentWinners = [
            //       {address:"terra1an23yxwkfda0m5dmkcxpyrqux83cw5esg9ex86",claims:{claimed:true,ranks:[4]}},
            //      ]

            if (state.allRecentWinners.length == 0) {
                type = false
            }

            state.allRecentWinners.map((obj) => {
                if (obj.address == connectedWallet.walletAddress) {
                    type = obj
                }
            })

            dispatch({ type: 'setYouWon', message: type })
            console.log(state.youWon)
        } catch (e) {
            console.log(e)
        }
    }

    async function contactBalance() {
        if (connectedWallet && connectedWallet.walletAddress && lcd) {
            //   setShowConnectOptions(false);
            dispatch({ type: 'setWallet', message: connectedWallet })

            let coins
            let alteTokens

            let token
            try {
                const api = new WasmAPI(lcd.apiRequester)
                coins = await lcd.bank.balance(connectedWallet.walletAddress)

                const contractConfigInfo = await api.contractQuery(
                    state.loterraContractAddress,
                    {
                        config: {},
                    },
                )
                setConnected(true)
                const lastDrawnJackpot = await api.contractQuery(
                    state.loterraContractAddress,
                    {
                        jackpot: {
                            lottery_id: contractConfigInfo.lottery_counter - 1,
                        },
                    },
                )
                dispatch({
                    type: 'setLastDrawnJackpot',
                    message: parseInt(lastDrawnJackpot) / 1000000,
                })

                // Get balance to staked on Dogether
                const balance_stake_on_dogether = await api.contractQuery(
                    state.dogetherStakingAddress,
                    {
                        holder: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({
                    type: 'setBalanceStakeOnDogether',
                    message: balance_stake_on_dogether.balance,
                })

                // Get balance pending to claim on Dogether
                const claims_unstake_dogether = await api.contractQuery(
                    state.dogetherStakingAddress,
                    {
                        claims: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({
                    type: 'setHolderClaimsDogether',
                    message: claims_unstake_dogether.claims,
                })

                const holder = await api.contractQuery(
                    state.loterraStakingAddress,
                    {
                        holder: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({ type: 'setAllHolder', message: holder })
                //console.log(holder)

                const holderAccruedRewards = await api.contractQuery(
                    state.loterraStakingAddress,
                    {
                        accrued_rewards: {
                            address: connectedWallet.walletAddress,
                        },
                    },
                )
                dispatch({
                    type: 'setHolderAccruedRewards',
                    message: holderAccruedRewards.rewards,
                })
                //console.log(holder)

                const token = await api.contractQuery(
                    state.loterraContractAddressCw20,
                    {
                        balance: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({ type: 'setLotaBalance', message: token })
                //console.log(token)

                const claims = await api.contractQuery(
                    state.loterraStakingAddress,
                    {
                        claims: { address: connectedWallet.walletAddress },
                    },
                )
                //console.log("claims")
                //console.log(claims)
                dispatch({ type: 'setHolderClaims', message: claims.claims })

                const tokenLP = await api.contractQuery(
                    state.loterraLPAddress,
                    {
                        balance: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({ type: 'setLPBalance', message: tokenLP })
                //console.log(tokenLP)
                const LPHolderAccruedRewards = await api.contractQuery(
                    state.loterraStakingLPAddress,
                    {
                        accrued_rewards: {
                            address: connectedWallet.walletAddress,
                        },
                    },
                )
                dispatch({
                    type: 'setLPHolderAccruedRewards',
                    message: LPHolderAccruedRewards.rewards,
                })

                const holderLP = await api.contractQuery(
                    state.loterraStakingLPAddress,
                    {
                        holder: { address: connectedWallet.walletAddress },
                    },
                )
                dispatch({ type: 'setAllHolderLP', message: holderLP })

                const claimsLP = await api.contractQuery(
                    state.loterraStakingLPAddress,
                    {
                        claims: { address: connectedWallet.walletAddress },
                    },
                )

                dispatch({
                    type: 'setHolderClaimsLP',
                    message: claimsLP.claims,
                })

                checkIfWon()

                alteTokens = await api.contractQuery(
                    state.alteredContractAddress,
                    {
                        balance: {
                            address: connectedWallet.walletAddress,
                        },
                    },
                )

                // Better to keep it at the end
                // This one can generate an error on try catch if no combination played
                // Because if error others query will not be triggered right after the error
                const combinations = await api.contractQuery(
                    state.loterraContractAddress,
                    {
                        combination: {
                            lottery_id: contractConfigInfo.lottery_counter,
                            address: connectedWallet.walletAddress,
                        },
                    },
                )
                dispatch({ type: 'setAllCombinations', message: combinations })
            } catch (e) {
                console.log(e)
            }

            //Store coins global state
            dispatch({ type: 'setAllNativeCoins', message: coins })
            // console.log(coins)
            let alte = parseInt(alteTokens.balance) / 1000000
            console.log(alte)
            let uusd = coins.filter((c) => {
                return c.denom === 'uusd'
            })
            let ust = parseInt(uusd) / 1000000
            setBank(numeral(ust).format('0,0.00'))
            dispatch({ type: 'setUstBalance', message: ust })
            setAlteBank(numeral(alte).format('0,0.00'))
            // connectTo("extension")
        } else {
            setBank(null)
            setAlteBank(null)
            dispatch({ type: 'setWallet', message: {} })
        }
    }

    function renderDialog() {
        if (isDisplayDialog) {
            return (
                <div /*style={Modal}*/ onClick={() => closeModal()}>
                    <div /*style={Dialog}*/ className="card-glass">
                        <button
                            onClick={() => connectTo('extension')}
                            className="button-pink-outline"
                            style={DialogButton}
                        >
                            Terra Station (extension)
                        </button>
                        <button
                            onClick={() => connectTo('mobile')}
                            className="button-pink-outline"
                            style={DialogButton}
                        >
                            Terra Station (mobile)
                        </button>
                    </div>
                </div>
            )
        }
    }

    function returnBank() {
        return (
            <>
                <Wallet
                    size={24}
                    color="#0F0038"
                    style={{ display: 'inline-block', marginTop: '-3px' }}
                />{' '}
                {bank && alteBank ? (
                    <>
                        <Check
                            size={16}
                            color="#0F0038"
                            weight="bold"
                            style={{
                                display: 'inline-block',
                                marginTop: '-8px',
                                marginLeft: '-5px',
                            }}
                        />
                    </>
                ) : (
                    <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </>
        )
    }

    const [scrolled, setScrolled] = React.useState(false)
    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 25) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    function showSideNav() {
        setSideNav(!sideNav)
    }

    useEffect(() => {
        if (!state.config.lottery_counter) {
            baseData()
        }
        if (connectedWallet) {
            contactBalance()
        }

        //console.log(connectedWallet)
        window.addEventListener('scroll', handleScroll)
    }, [
        connectedWallet,
        lcd,
        state.config,
        state.allRecentWinners,
        state.youWon,
    ])

    return (
        <div
            className={
                scrolled
                    ? 'navbar navbar-expand p-2 p-md-3 sticky'
                    : 'navbar navbar-expand p-2 p-md-3'
            }
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/logo.png" /> <span>LOTERRA</span>
                </a>
                <nav
                    className={
                        sideNav
                            ? 'navbar-nav main-nav me-auto open'
                            : 'navbar-nav main-nav me-auto'
                    }
                >
                    <button
                        className="main-nav-close-toggle"
                        onClick={() => showSideNav()}
                    >
                        <X size={36} />
                    </button>
                    <li className="nav-item">
                        <a href="/" className={'nav-link ' + homeClass}>
                            <Ticket
                                size={24}
                                style={{
                                    marginRight: '3px',
                                    position: 'relative',
                                    top: '-1px',
                                }}
                            />{' '}
                            Lottery
                            <span className="item-label">Jackpot Lottery</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/dogether"
                            className="nav-link"
                            style={{ position: 'relative' }}
                        >
                            <Ticket
                                size={24}
                                style={{
                                    marginRight: '3px',
                                    position: 'relative',
                                    top: '-1px',
                                }}
                            />{' '}
                            Dogether
                            <span className="item-label">No loss lottery</span>
                            <span
                                className="badge"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '-9px',
                                    fontSize: '10px',
                                    lineHeight: '10px',
                                    padding: '3px',
                                    textTransform: 'uppercase',
                                    color: '#10003b',
                                    background: '#8bf6c2',
                                }}
                            >
                                BETA
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/staking"
                            className="nav-link"
                            className={'nav-link ' + stakingClass}
                        >
                            <Coin
                                size={24}
                                style={{
                                    marginRight: '3px',
                                    position: 'relative',
                                    top: '-1px',
                                }}
                            />{' '}
                            Staking
                            <span className="item-label">
                                Become a casino owner or earn LOTA when staking
                                LP
                            </span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/dao"
                            className="nav-link"
                            className={'nav-link ' + daoClass}
                        >
                            <Bank
                                size={24}
                                style={{
                                    marginRight: '3px',
                                    position: 'relative',
                                    top: '-1px',
                                }}
                            />{' '}
                            DAO
                            <span className="item-label">
                                Together we decide
                            </span>
                        </a>
                    </li>
                </nav>

                <div className="navbar-nav ms-auto">
                    {!connected && (
                        <>
                            <div className="btn-group">
                                <button
                                    className="btn btn-green nav-item dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <Wallet
                                        size={18}
                                        style={{
                                            marginTop: '-4px',
                                            marginRight: '4px',
                                        }}
                                    />
                                    Connect
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <button
                                        onClick={() => connectTo('extension')}
                                        className="dropdown-item"
                                    >
                                        <CaretRight
                                            size={16}
                                            style={{ marginTop: '-4px' }}
                                        />{' '}
                                        Terra Station (extension/mobile)
                                    </button>
                                    <button
                                        onClick={() => connectTo('mobile')}
                                        className="dropdown-item"
                                    >
                                        <CaretRight
                                            size={16}
                                            style={{ marginTop: '-4px' }}
                                        />{' '}
                                        Terra Station (mobile for desktop)
                                    </button>
                                </ul>
                            </div>
                            <button
                                className="btn btn-default nav-item ms-2 main-nav-toggle"
                                onClick={() => showSideNav()}
                            >
                                <List size={26} />
                            </button>
                        </>
                    )}
                    {connected && (
                        <>
                            <button
                                className={
                                    'btn btn-default nav-item me-2' +
                                    (state.youWon ? ' winner' : '')
                                }
                                style={{
                                    padding: '0.275rem 0.55rem',
                                }}
                                onClick={() => setIsModal(!isModal)}
                            >
                                {state.youWon ? (
                                    <>
                                        <Trophy
                                            size={33}
                                            style={{
                                                marginTop: '-2px',
                                                color: '#ecba26',
                                            }}
                                        />
                                        <span className="badge">YOU WON</span>
                                    </>
                                ) : (
                                    <UserCircle
                                        size={33}
                                        style={{
                                            marginTop: '-2px',
                                            color: '#72ffc1',
                                        }}
                                    />
                                )}
                            </button>
                            <button
                                className="btn btn-green nav-item dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {returnBank() ? returnBank() : 'loading'}
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="dropdownMenuButton2"
                                style={{ top: '70px' }}
                            >
                                {bank && alteBank && (
                                    <div
                                        className="wallet-info d-inline-block text-start px-3"
                                        style={{ fontSize: '13px' }}
                                    >
                                        <span className="d-block">
                                            <strong>YOUR WALLET:</strong>
                                        </span>
                                        <span
                                            className="d-block"
                                            style={{ marginBottom: '-5px' }}
                                        >
                                            {bank}{' '}
                                            <span className="text-sm">UST</span>
                                        </span>
                                        <span className="d-block">
                                            {alteBank}{' '}
                                            <span className="text-sm">
                                                ALTE
                                            </span>
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={() => connectTo('disconnect')}
                                    className="dropdown-item"
                                >
                                    <Power
                                        size={16}
                                        style={{ marginTop: '-2px' }}
                                    />{' '}
                                    <span style={{ fontSize: '13px' }}>
                                        Disconnect
                                    </span>
                                </button>
                            </ul>
                            <button
                                className="btn btn-default nav-item ms-2 main-nav-toggle"
                                onClick={() => showSideNav()}
                            >
                                <List size={26} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/*<button onClick={() => display()}>Connect Wallet</button>
        {renderDialog()}*/}
            {connected && connectedWallet && (
                <UserModal
                    open={isModal}
                    toggleModal={() => setIsModal(!isModal)}
                    connectedWallet={connectedWallet}
                />
            )}
        </div>
    )
}
