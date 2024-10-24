import { FC } from "react";
import { graphDecreseIcon, graphIncreseIcon, towerGreenIcon, towerRedIcon } from "../../../constants/assets/dashboardAssets";
import { parseCurrency } from "../../../helpers/currency"
import classNames from "classnames";

interface SummaryCardProps {
  isIncome: boolean;
}

export const SummaryCard: FC<SummaryCardProps> = ({ isIncome }) => {
  return (
    <section className=" bg-white rounded-md p-4 border-gray-50 border-2">
      <div className="flex justify-between gap-20">
        <div className="flex gap-2 items-center ">
          <img src={isIncome ? towerGreenIcon : towerRedIcon} />
          <p className="font-semibold">Ingresos totales</p>
        </div>
        <div className="flex gap-2 ">
          <p className={classNames({
            'text-green-500': isIncome,
            'text-red-500': !isIncome,
          })}>{isIncome ? '+' : '-'} %12</p>
        </div>
      </div>
      <p className="text-xl font-semibold mt-3">{parseCurrency(5320)}</p>
    </section>
  )
}