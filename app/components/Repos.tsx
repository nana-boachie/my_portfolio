"use client"

import {
  ChevronLeft,
  ChevronRight,
  ComputerIcon,
  Copy,
  CreditCard,
  Icon,
  MoreVertical,
  Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"

export default function Component() {

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-y-0.5 gap-x-4">
          <CardTitle className="group flex items-center gap-2 text-lg">
            GITHUB Repos
           
          </CardTitle>
          <CardDescription>Take a Gander</CardDescription>
        </div>
     
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
      </CardContent>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
      </CardContent>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-3">
          <div className="font-semibold">C prog</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                C - programming
              </span> <span> 100%</span>
            
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Python  
              </span>
              <span> 100%</span>
            </li>
          </ul>
          </div>
      </CardContent>


      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        
      </CardFooter>
    </Card>
  )
}
