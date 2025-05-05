import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

const FilterproductSection = ({
  searchTerm,
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
  priceRange,
  categories,
  setSortValue,
}) => {
  // Handle Search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("Search:", value);
  };

  // Handle Category Select
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  // Handle Category Select
  const handleShortChange = (value) => {
    setSortValue(value);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortValue("");
    setPriceRange(["", ""]);
  };

  return (
    <section className='my-16'>
      <div className='container max-w-7xl mx-auto font-montserrat tracking-wider'>
        <div className='flex justify-center my-5 p-3'>
          <div className='md:w-96 w-full flex justify-center items-start'>
            <Input
              className='bg-[#FFFFFF] h-12 focus-visible:border-gray-500 focus-visible:ring-gray-200 focus-visible:ring-offset-0 rounded-r-none'
              placeholder='Search'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-3'>
          <div className='w-full md:w-80'>
            <h5 className='mb-4'>Categories</h5>
            <div>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='text-gray-500'>
                    <SelectLabel>categories</SelectLabel>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='w-full md:w-80'>
            <div className='flex justify-between'>
              <h5 className='mb-9'>Price</h5>
              <p className='text-gray-500'>
                ${priceRange[0] ? priceRange[0] : 0} — $
                {priceRange[1] ? priceRange[1] : 1000}
              </p>
            </div>
            <div>
              <Slider
                defaultValue={[0, 100]}
                min={0}
                max={100}
                onValueChange={(newValue) => {
                  setPriceRange(newValue);
                }}
                className='cursor-pointer'
              />
            </div>
          </div>
          <div className='w-full md:w-80'>
            <div className='flex justify-between'>
              <h5 className='mb-4'>Short</h5>
              <p
                className='text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={handleResetFilter}>
                Reset Filter
              </p>
            </div>
            <div>
              <Select onValueChange={handleShortChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Sort by price:' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='text-gray-500'>
                    <SelectItem value='price'>
                      Sort by price: low to high
                    </SelectItem>
                    <SelectItem value='-price'>
                      Sort by price: high to low
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterproductSection;
