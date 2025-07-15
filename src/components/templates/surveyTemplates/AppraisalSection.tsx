import { useState } from "react";
import SectionHeading from "../../ui/SectionHeading";
import GradientText from "../../ui/GradientText";
import CardContainer from "../../ui/CardContainer";
import DashedGradientBox from "../../ui/DashedGradientBox";
import surveyIcon from "../../../assets/images/svg/survey-icon.svg"; // Reuse or create appraisal-specific icon
import { useAppraisalData } from "../../../hooks/templates/useAppraisalData";
import { Dialog } from "@headlessui/react";
import { Pagination } from "../../common/Pagination"; 

type AppraisalTemplate = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

type AppraisalTemplatesResponse = {
  status: string;
  message: string;
  data: {
    pageMetaDto: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    result: AppraisalTemplate[];
  };
};

const AppraisalSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [take] = useState(10); // Items per page

  const { getTemplates, deleteTemplate } = useAppraisalData();
  
  // Get templates data with pagination
  const { 
    data: apiResponse, 
    isLoading, 
    isError,
    error
  } = getTemplates({ page: currentPage, take }) as {
    data: AppraisalTemplatesResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
  };

  // Extract templates and pagination metadata from API response
  const templates = apiResponse?.data?.result || [];
  const pageMeta = apiResponse?.data?.pageMetaDto;

  console.log("Appraisal API Response:", apiResponse);
  console.log("Appraisal Page Meta:", pageMeta);

  const handleDelete = () => {
    if (selectedId) {
      deleteTemplate().mutate(selectedId, {
        onSuccess: () => {
          setShowModal(false);
          setSelectedId(null);
        },
        onError: (deleteError: any) => {
          console.error("Error deleting appraisal template:", deleteError);
          alert("Failed to delete the template. Please try again.");
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      <SectionHeading>Appraisal Templates</SectionHeading>

      <CardContainer className="">
        <div className="flex justify-between items-center mb-4">
          <DashedGradientBox>
            <GradientText>+Create</GradientText>
          </DashedGradientBox>
        </div>


        {/* Appraisal Templates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 min-h-[200px]">
          {isLoading && (
            <div className="col-span-full flex justify-center py-8">
              <p>Loading appraisal templates...</p>
            </div>
          )}

          {isError && (
            <div className="col-span-full text-center py-4 text-red-500">
              <p>Error loading appraisals: {error?.message || "Unknown error"}</p>
            </div>
          )}

          {!isLoading && !isError && templates.length === 0 && (
            <div className="col-span-full flex items-center justify-center py-4">
              <p>No appraisal templates found</p>
            </div>
          )}

          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setSelectedId(template.id);
                setShowModal(true);
              }}
            >
              <img 
                src={surveyIcon} 
                alt="Appraisal Icon" 
                className="w-36 h-30 mb-2 object-contain"
              />
              <h3 className="font-medium text-center text-sm text-gray-800 mb-1">
                {template.title || "Untitled Appraisal"}
              </h3>
              
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pageMeta && (
          <Pagination 
            currentPage={pageMeta.page}
            totalPages={pageMeta.pageCount}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        )}

        {/* Delete Confirmation Modal */}
        <Dialog 
          open={showModal} 
          onClose={() => setShowModal(false)} 
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold">
                Delete Template
              </Dialog.Title>
              <p className="mt-2 text-gray-600">
                Are you sure you want to delete this appraisal template? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete Template
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </CardContainer>
    </section>
  );
};

export default AppraisalSection;