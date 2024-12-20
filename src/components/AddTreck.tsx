import { JSX } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FormComponent } from "./FormComponent";
import { createTreck } from "@/actions";

export const AddTreck = async (): Promise<JSX.Element> => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Add New Treck</CardTitle>
      <CardDescription>Share your adventure with the world</CardDescription>
    </CardHeader>
    <CardContent>
      <FormComponent action={createTreck}>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            required
            className="w-full"
            placeholder="Enter a captivating title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            required
            className="w-full min-h-[100px]"
            placeholder="Describe your treck experience"
          />
        </div>
        <div className="mb-4">
          <Label className="block font-semibold mb-1">
            Images (Paste image URLs):
          </Label>
          <Input
            name="images"
            type="text"
            placeholder="Image URL #1"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
          <Input
            name="images"
            type="text"
            placeholder="Image URL #2"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
          <Input
            name="images"
            type="text"
            placeholder="Image URL #3"
            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          />
        </div>
      </FormComponent>
    </CardContent>
    <CardFooter>
      <Button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Treck
      </Button>
    </CardFooter>
  </Card>
);
