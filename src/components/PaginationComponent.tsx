import React from 'react';
import { IonButton, useIonRouter } from '@ionic/react';

const PaginationComponent: React.FC<{ type:string,searchQuery:string | undefined,currentPage: number, totalPages: number, handlePreviousPage: () => void, handleNextPage: (page: number) => void }> = ({type,searchQuery,currentPage, totalPages, handlePreviousPage, handleNextPage }) => {

  // Calculate previous and next page range
  const previous_page = currentPage > 2 ? currentPage - 2 : 1;
  const next_page = currentPage < totalPages ? currentPage + 2 : totalPages;
  const router = useIonRouter();
  // Create an array of pages to display
  const pages = Array(next_page - previous_page + 1)
    .fill(0)
    .map((_, idx) => previous_page + idx);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <IonButton onClick={()=>{
         router.push(`/${type}?search=${searchQuery}&&pageIndex=1`)
      }} disabled={currentPage === 1}>
        {"<<"}
      </IonButton>
      <IonButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </IonButton>
      
      {/* Render the page buttons */}
      {pages.map((page) => (
        <IonButton
          key={page}
          onClick={() =>{
            router.push(`/${type}?search=${searchQuery}&&pageIndex=${page}`)
          }}
          disabled={page === currentPage}
        >
          {page}
        </IonButton>
      ))}
      
      <IonButton onClick={() => handleNextPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </IonButton>
      <IonButton onClick={() =>    router.push(`/${type}?search=${searchQuery}&&pageIndex=${totalPages}`)} disabled={currentPage === totalPages}>
       {">>"}
      </IonButton>
    </div>
  );
};

export default PaginationComponent;
