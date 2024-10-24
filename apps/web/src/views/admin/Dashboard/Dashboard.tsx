import { FilterTabs } from '../../../components/admin/dashboard/FilterTabs';
import { SummaryCard } from '../../../components/admin/dashboard/SummaryCard';
import { TransactionGraph } from '../../../components/admin/dashboard/TransactionGraph/TransactionGraph';
import './Dashboard.scss';

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="flex flex-col w-3/4">
        <div>
          <FilterTabs />
        </div>

        <div className="w-full flex gap-4 mt-6">
          <SummaryCard isIncome={true} />
          <SummaryCard isIncome={false} />
        </div>

        <div className="mt-6">
          <TransactionGraph />
        </div>
      </div>
    </section>  
  );
};

export default Dashboard;