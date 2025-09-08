'use client';

import React, { useState } from 'react';
import { TabButton } from './(components)/TabButton';
import { TabPane } from './(components)/TabPane';
import { SellRequest } from './(components)/SellRequest';
import { ContactRequest } from './(components)/ContactRequest';

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState('first');

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Tab Navigation Column */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <nav className="space-y-2" aria-label="Tabs">
            <TabButton
              isActive={activeTab === 'first'}
              onClick={() => setActiveTab('first')}>
              Sale Requests
            </TabButton>
            <TabButton
              isActive={activeTab === 'second'}
              onClick={() => setActiveTab('second')}>
              Contact Requests
            </TabButton>
          </nav>
        </div>

        {/* Tab Content Column */}
        <div className="w-full md:w-3/4">
          <TabPane isActive={activeTab === 'first'}>
            <SellRequest />
          </TabPane>
          <TabPane isActive={activeTab === 'second'}>
            <ContactRequest />
          </TabPane>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
