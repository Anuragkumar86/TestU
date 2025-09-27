import AllFields from '@/components/AllFields';
import prisma from '@/lib/prisma'
import { Field } from '@prisma/client';
import { AxiosError } from 'axios';

async function getAllField(){
    const topics = prisma.field.findMany({
        orderBy: {name: "asc"}
    })
    return topics;
}

export default async function FieldsPage(){
    let fields: Field[] | null = null;
    let errorMessage: string | null = null;

    try{

        fields = await getAllField();
    }
    catch(err: unknown){
        if(err instanceof AxiosError){
            errorMessage = err.response?.data?.message || "Our database is not Available now please try again after sometime"
        }
        else{
            errorMessage = "unable to fetch fields please try again after sometime"
        }
    }

    if(errorMessage){
        return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Server Unavailable
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          {errorMessage}
        </p>
      </div>
    );
    }

     if (!fields || fields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          No Fields found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          There are no fields available at this time.
        </p>
      </div>
    );
  }

  
  return (
      <div>
        <AllFields fields={fields} />
      </div>
    );
}