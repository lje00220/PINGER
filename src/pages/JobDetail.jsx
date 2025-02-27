import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  return <div className="h-screen bg-my-bg"></div>;
};

export default JobDetail;
