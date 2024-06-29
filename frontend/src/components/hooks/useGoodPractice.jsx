// useGoodPracticeApprovals.js

import { useState, useEffect } from 'react';
import API from '@/utils/API';

export const useGoodPracticeApprovals = (stateId) => {
  const [goodPracticeApprovals, setGoodPracticeApprovals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    getAllGoodPracticeApprovals(stateId);
  }, [stateId]);

  const getAllGoodPracticeApprovals = async (stateId) => {
    try {
      const { data } = await API.get('/api/v1/good-practice/all', {
        params: { state_id: stateId },
      });
      data?.data?.sort((a, b) => b.id - a.id);
      setGoodPracticeApprovals(data?.data || []);
    } catch (error) {
      console.log('Error fetching Good Practice Approvals:', error);
    }
  };

  const filteredApprovals = goodPracticeApprovals.filter((approval) => {
    // Implement your filtering logic here as per your component's needs
    return true;
  });

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredApprovals.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    goodPracticeApprovals,
    filteredApprovals,
    currentData,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
