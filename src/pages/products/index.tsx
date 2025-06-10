import ListDropDown from "../../components/productLists/ListDropDown";
import CardContainer from "../../components/ui/CardContainer";

const ProductLists = () => {
  return (
    <main className="w-full">
        <div className="flex justify-between items-center">
            <h1 className="font-semibold">Product Lists</h1>
            <button className="font-semibold text-white bg-gradient-to-r from-primary to-secondary px-10 py-2 rounded-[8px]">Create +</button>
        </div>
        <CardContainer className="h-screen">
          <div className="grid grid-cols-2 gap-x-5 gap-y-16">
            <ListDropDown name="Skill List" details={["Design", "Design", "Design", "Design", "Design"]}/>
            <ListDropDown name="Company Services"  details={["Details", "Details", "Details", "Details", "Details"]}/>
            <ListDropDown name="Project Category" details={["Details", "Details", "Details", "Details", "Details"]}/>
            <ListDropDown name="Competency List" details={["Details", "Details", "Details", "Details", "Details"]}/>
            <ListDropDown name="Industry List" details={["Details", "Details", "Details", "Details", "Details"]}/>
          </div>
        </CardContainer>

    </main>
  )
}

export default ProductLists;