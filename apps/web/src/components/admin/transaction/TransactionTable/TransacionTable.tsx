import classNames from "classnames"
import { parseCurrency } from "../../../../helpers/currency"
import { Transaction, TransactionType } from "../../../../interfaces/Transaction"
import { FC } from "react"
import { parseDate } from "../../../../helpers/date"
import { useLanguage } from "../../../../hooks/useLanguage"

interface TransactionTableProps {
  list: Transaction[]
}

export const TransactionTable: FC<TransactionTableProps> = ({ list })  => {
  const { language, content } = useLanguage('walletDetails');

  return (
    <section className="flex flex-col gap-6 mt-10">
      {list.map((transaction) => (
        <div key={transaction.amount} className="flex gap-5 flex-col">
          <div className="flex gap-5 items-center">
            <div className="w-10 h-10 bg-primary-normal rounded-full flex justify-center items-center text-white font-extrabold">{transaction.concept[0].toUpperCase()}</div>
            <div className='flex w-full justify-between items-center'>
              <div>
                <p className="font-semibold">{transaction.concept}</p>
                <p>{parseDate(transaction.createdAt, language)}</p>
              </div>
              <div className="flex gap-8">
                {transaction.category && (
                  <p className="text-xs px-3 py-[6px] bg-secondary-50 text-secondary-700 font-semibold rounded-full">
                    {transaction.category.name}
                  </p>
                )}
                <p className={classNames({
                  'text-green-500': transaction.type === TransactionType.INCOME,
                  'text-red-500': transaction.type !== TransactionType.INCOME,
                })}>
                  {transaction.type === TransactionType.INCOME ? '+ ' : '- '}
                  {parseCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}

      {!list.length && <div className="h-60 flex justify-center items-center">
        <p className="text-semibold text-gray-400">
          {content.emptyResults}
        </p>
      </div>}
    </section>
  )
}