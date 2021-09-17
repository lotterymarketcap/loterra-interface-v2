import React, { useState } from 'react'
import { useStore } from '../store'

import { UserCircle } from 'phosphor-react'

export default function WinnerRow(props) {
    const { a, obj } = props
    const { state, dispatch } = useStore()

    function getRanks(ranks) {
        const rank1 = []
        const rank2 = []
        const rank3 = []
        const rank4 = []
        const rank5 = []
        const rank6 = []
        ranks.map((obj, i) => {
            if (obj == 6) {
                rank6.push(obj)
            }
            if (obj == 5) {
                rank5.push(obj)
            }
            if (obj == 4) {
                rank4.push(obj)
            }
            if (obj == 3) {
                rank3.push(obj)
            }
            if (obj == 2) {
                rank2.push(obj)
            }
            if (obj == 1) {
                rank1.push(obj)
            }
        })

        const ranksArray = [rank6, rank5, rank4, rank3, rank2, rank1]

        function getComboText(rank, amount) {
            let text = ''
            if (rank == 1) {
                text =
                    state.comboTextOne[parseInt(amount)] != undefined
                        ? state.comboTextOne[parseInt(amount - 1)]
                        : state.comboTextOne[state.comboTextFour.length - 1]
            }
            if (rank == 2) {
                text =
                    state.comboTextTwo[parseInt(amount)] != undefined
                        ? state.comboTextTwo[parseInt(amount - 1)]
                        : state.comboTextTwo[state.comboTextFour.length - 1]
            }
            if (rank == 3) {
                text =
                    state.comboTextThree[parseInt(amount)] != undefined
                        ? state.comboTextThree[parseInt(amount - 1)]
                        : state.comboTextThree[state.comboTextFour.length - 1]
            }
            if (rank == 4) {
                text =
                    state.comboTextFour[parseInt(amount)] != undefined
                        ? state.comboTextFour[parseInt(amount - 1)]
                        : state.comboTextFour[state.comboTextFour.length - 1]
            }
            if (rank == 5) {
                text =
                    state.comboTextFive[parseInt(amount)] != undefined
                        ? state.comboTextFive[parseInt(amount - 1)]
                        : state.comboTextFive[state.comboTextFour.length - 1]
            }
            if (rank == 6) {
                text =
                    state.comboTextSix[parseInt(amount)] != undefined
                        ? state.comboTextSix[parseInt(amount - 1)]
                        : state.comboTextSix[state.comboTextFour.length - 1]
            }
            return text
        }

        function getAmountClass(amount) {
            let name = ''

            for (let index = 0; index < state.amountClasses.length; index++) {
                const element = state.amountClasses[index]
                if (element.amount == amount) {
                    name = element.class
                }
            }

            return name
        }

        function comboTextResponse(rank, amount) {
            let result = ''
            for (let index = 0; index < state.rankClasses.length; index++) {
                const element = state.rankClasses[index]
                if (parseInt(rank) == element.rank) {
                    result =
                        '<span class="combo-text ' +
                        element.class +
                        ' ' +
                        getAmountClass(amount) +
                        '">' +
                        getComboText(rank, amount) +
                        '</span>'
                    return result
                }
            }
        }

        let html = ''
        for (let index = 0; index < ranksArray.length; index++) {
            const element = ranksArray[index]
            if (element.length > 0) {
                html += '<span class="combo-box">'
                html +=
                    '<span class="main">' +
                    element[0] +
                    '</span>' +
                    '<span class="special">x' +
                    element.length +
                    '</span>'
                html += comboTextResponse(element[0], element.length)
                html += '</span>'
            }
        }

        return (
            <div className="combos">
                <span dangerouslySetInnerHTML={{ __html: html }}></span>
            </div>
        )
    }

    return (
        <tr key={a}>
            <th scope="row" style={{ minWidth: '265px' }}>
                {getRanks(obj.claims.ranks)}
            </th>
            <td style={{ minWidth: '450px' }}>
                <UserCircle size={18} color="#827A99" />
                {obj.address}
            </td>
            <td
                style={{ background: '#0F0038', textAlign: 'center' }}
                className={obj.claims.claimed ? 'collected' : 'uncollected'}
            >
                {obj.claims.claimed ? 'Collected' : 'Uncollected'}
            </td>
        </tr>
    )
}
