import { useEffect, useState } from 'react';
import SideNav from '../SideNav';
import Summary from '../Summary';
import Charts from '../Charts';
import axiosInstance from '../../axisoInstance';
import { toast } from 'react-toastify';

// Add this CSS either in a separate file or using a CSS-in-JS solution
const loadingStyles = `
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Main = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/summary');
                //toast.success('Data fetched successfully');
                setUserData(response.data);
                
            } catch (error) {
                console.error('Error fetching user summary:', error);
                setError('Error fetching data. Please try again later.');
                toast.error('Error Fetching Data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <>
                <style>{loadingStyles}</style>
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            </>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <SideNav data={userData}>
            {userData ? (
                <>
                    <Summary data={userData} />
                    <Charts data={userData} />
                </>
            ) : (
                <div>No data available</div>
            )}
        </SideNav>
    );
};

export default Main;