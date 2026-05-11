import React from 'react'
import { useSelector } from 'react-redux'

const PageLoader = () => {
  const { isLoading } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="spinner"></div>
        <div className="loader-text">Loading</div>
      </div>
    </div>
  )
}

export default PageLoader