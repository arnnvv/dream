import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { db } from "@/lib/db";
import { trecks } from "@/lib/db/schema";
import { imagesByTreckId } from "@/lib/db/queries";
import Image from "next/image";

export const ExistingTrecks = async (): Promise<JSX.Element> => {
  const allTrecks = await db.select().from(trecks).orderBy(trecks.id);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Existing Trecks</h2>
      {allTrecks.length === 0 ? (
        <p>No trecks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allTrecks.map((treck) => (
            <Card key={treck.id}>
              <CardHeader>
                <CardTitle>{treck.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{treck.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Created at: {treck.createdAt.toLocaleString()}
                </p>
                {imagesByTreckId[treck.id]?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {imagesByTreckId[treck.id].map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-32 h-32 border border-gray-300 rounded overflow-hidden"
                      >
                        <Image
                          src={img.imageUrl}
                          alt={`Treck ${treck.title} Image #${img.order}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
