import { JSX } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FormComponent } from "./FormComponent";
import { createTestimonial } from "@/actions";

export const AddTestimonial = async (): Promise<JSX.Element> => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Add New Testimonial</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <FormComponent action={createTestimonial}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heading">Heading/Title</Label>
          <Input
            id="heading"
            name="heading"
            type="text"
            required
            placeholder="Amazing Experience!"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="review">Review</Label>
          <Textarea
            id="review"
            name="review"
            required
            placeholder="Share your experience..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            required
            placeholder="https://example.com/profile-image.jpg"
          />
        </div>
      </FormComponent>
    </CardContent>
    <CardFooter>
      <Button type="submit" className="w-full">
        Add Testimonial
      </Button>
    </CardFooter>
  </Card>
);
