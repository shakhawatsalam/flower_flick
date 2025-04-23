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
const FilterproductSection = () => {
  return (
    <section className='my-16'>
      <div className=' container max-w-7xl mx-auto font-montserrat tracking-wider'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 p-3'>
          <div className='w-full md:w-80'>
            <h5 className=''>Categories</h5>
            <div>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a fruit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value='apple'>Apple</SelectItem>
                    <SelectItem value='banana'>Banana</SelectItem>
                    <SelectItem value='blueberry'>Blueberry</SelectItem>
                    <SelectItem value='grapes'>Grapes</SelectItem>
                    <SelectItem value='pineapple'>Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='w-full md:w-80'>
            <h5 className='mb-4'>Price</h5>
            <div>
              <Slider
                defaultValue={[10, 80]}
                min={0}
                max={100}
                onValueChange={(newValue) => console.log(newValue)}
              />
            </div>
          </div>
          <div className='w-full md:w-80'>
            <h5>Short</h5>
            <div>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a fruit' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value='apple'>Apple</SelectItem>
                    <SelectItem value='banana'>Banana</SelectItem>
                    <SelectItem value='blueberry'>Blueberry</SelectItem>
                    <SelectItem value='grapes'>Grapes</SelectItem>
                    <SelectItem value='pineapple'>Pineapple</SelectItem>
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
