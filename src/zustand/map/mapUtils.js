// 비지니스 로직

export const filterJobsByKeyword = (keyword, jobData) => {
  if (keyword.trim() === '') return [];
  return jobData.filter(
    (job) => job.company_name.includes(keyword) || job.adress.includes(keyword),
  );
};
